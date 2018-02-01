<?php
/**
 * Copyright 2017 OpenStack Foundation
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

/**
 * Class EmailCreationRequestProcessTask
 */
final class EmailCreationRequestProcessTask extends CronTask
{

    /**
     * @var ITransactionManager
     */
    private $tx_manager;

    /**
     * AssetsSyncRequestProcessorTask constructor.
     * @param ITransactionManager $tx_manager
     */
    public function __construct(ITransactionManager $tx_manager){
        $this->tx_manager = $tx_manager;
        parent::__construct();
    }

    /**
     * @return void
     */
    public function run()
    {
        try
        {
            $init_time   = time();
            $processed   = $this->tx_manager->transaction(function(){
                $processed = 0;
                $requests  = EmailCreationRequest::get()->filter([
                    'Processed' => 0
                ])->sort('ID', 'ASC');

                foreach($requests as $email_request){
                    switch($email_request->ClassName){
                        case "SpeakerCreationEmailCreationRequest":{
                            $sender = new PresentationSpeakerCreationEmailMessageSender;
                            $sender->send(['Speaker' => $email_request->Speaker()]);
                        }
                        break;
                        case "MemberPromoCodeEmailCreationRequest": {
                            if (!$email_request->PromoCode()->isEmailSent()) {
                                $sender = new MemberPromoCodeEmailSender;
                                $sender->send([
                                    "Name"      => $email_request->Name,
                                    "Email"     => $email_request->Email,
                                    'Summit'    => $email_request->PromoCode()->Summit(),
                                    'PromoCode' => $email_request->PromoCode()
                                ]);
                                $email_request->PromoCode()->markAsSent();
                                $email_request->PromoCode()->write();
                            }
                        }
                        break;
                        case 'SpeakerSelectionAnnouncementEmailCreationRequest':
                        {
                            $sender = SpeakerSelectionAnnouncementEmailCreationRequestSenderServiceFactory::build($email_request);
                            if(is_null($sender)) continue;
                            if($email_request->Speaker()->announcementEmailAlreadySent($email_request->Summit()->ID)) continue;
                            $sender->send([
                                "Role"      => $email_request->Role,
                                "Speaker"   => $email_request->Speaker(),
                                "Summit"    => $email_request->Summit(),
                                'PromoCode' => $email_request->PromoCode()
                            ]);
                            $email_request->PromoCode()->markAsSent();
                            $email_request->PromoCode()->write();
                        }
                        break;
                        default:
                        {
                            continue;
                        }
                        break;
                    }

                    $email_request->markAsProcessed();
                    $email_request->write();
                    $processed++;
                }

                return $processed;
            });
            $finish_time = time() - $init_time;
            echo 'processed records ' . $processed. ' - time elapsed : '.$finish_time. ' seconds.';
        }
        catch(Exception $ex)
        {
            SS_Log::log($ex->getMessage(), SS_Log::ERR);
        }
    }
}