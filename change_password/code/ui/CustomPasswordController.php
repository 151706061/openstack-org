<?php
/**
 * Copyright 2014 Openstack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

/***
 * Class CustomPasswordController
 */
class CustomPasswordController extends Security
{

    private static $allowed_actions = array(
        'changepassword',
        'lostpassword',
        'ChangePasswordForm',
        'LostPasswordForm',
    );

    /**
     * @var PasswordManager
     */
    private $password_manager;

    /**
     * @var ITransactionManager
     */
    private $tx_manager;

    public function __construct()
    {
        parent::__construct();
        $this->tx_manager       = SapphireTransactionManager::getInstance();
        $this->password_manager = new PasswordManager($this->tx_manager);
    }

    /**
     * Factory method for the lost password form
     * @return Form Returns the lost password form
     */
    public function ChangePasswordForm()
    {
        return new CustomChangePasswordForm($this, 'ChangePasswordForm');
    }

    /**
     * @return string
     */
    public function changepassword()
    {
        $controller = $this->getResponseController(_t('Security.CHANGEPASSWORDHEADER', 'Change your password'));

        // if the controller calls Director::redirect(), this will break early
        if(($response = $controller->getResponse()) && $response->isFinished()) return $response;

        try {

            $former_hash = Session::get('AutoLoginHash');

            // if we have the token and the member redirect back to clear those values and avoid leaking
            // on referer header
            if (isset($_REQUEST['t']) && isset($_REQUEST['m'])) {
                // if we dont have a former autologin hash, generate it ...
                if (empty($former_hash)) {
                    $new_hash = $this->password_manager->verifyToken((int)@$_REQUEST['m'], @$_REQUEST['t']);
                    Session::set('AutoLoginHash', $new_hash);
                }
                return $this->redirect($this->Link('changepassword'));
            }

            if (!empty($former_hash)) {
                // Subsequent request after the "first load with hash"
                $customisedController = $controller->customise(array(
                    'Content' =>
                        '<p>' .
                        _t('Security.ENTERNEWPASSWORD', 'Please enter a new password.') .
                        '</p>',
                    'Form' => $this->ChangePasswordForm(),
                ));
            } else {
                if (Member::currentUser()) {
                    // Logged in user requested a password change form.
                    $customisedController = $controller->customise(array(
                        'Content' => '<p>'
                            . _t('Security.CHANGEPASSWORDBELOW', 'You can change your password below.') . '</p>',
                        'Form' => $this->ChangePasswordForm()
                    ));
                } else {
                    self::permissionFailure(
                        $this,
                        _t('Security.ERRORPASSWORDPERMISSION',
                            'You must be logged in in order to change your password!')
                    );

                    return;
                }
            }
        } catch (InvalidPasswordResetLinkException $ex1) {
            $customisedController = $controller->customise(
                array(
                    'Content' =>
                        sprintf('<p>This link is no longer valid as a newer request for a password reset has been made. Please check your mailbox for the most recent link</p><p>You can request a new one <a href="%s">here',
                            $this->Link('lostpassword'))
                )
            );
        }

        return $customisedController->renderWith(array(
            'Security_changepassword',
            'Security',
            $this->stat('template_main'),
            'ContentController'
        ));
    }

    /**
     * Show the "lost password" page
     *
     * @return string Returns the "lost password" page as HTML code.
     */
    public function lostpassword() {
        $controller = $this->getResponseController(_t('Security.LOSTPASSWORDHEADER', 'Lost Password'));

        // if the controller calls Director::redirect(), this will break early
        if(($response = $controller->getResponse()) && $response->isFinished()) return $response;

        $customisedController = $controller->customise(array(
            'Content' =>
                '<br><p>' .
                _t(
                    'Security.NOTERESETPASSWORD',
                    'Enter your e-mail address and we will send you a link with which you can reset your password'
                ) .
                '</p>' .
                '<p>' .
                'If you no longer have access to the email address associated with your OpenStackID, please send an email to ' .
                '<a href="mailto:info@openstack.org">info@openstack.org</a> with the relevant details.' .
                '</p>',
            'Form' => $this->LostPasswordForm(),
        ));

        //Controller::$currentController = $controller;
        return $customisedController->renderWith($this->getTemplatesFor('lostpassword'));
    }

    public function LostPasswordForm()
    {
        return new CustomLostPasswordForm(Controller::curr(), 'LostPasswordForm', $this->tx_manager);
    }
}