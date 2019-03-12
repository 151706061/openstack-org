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

/**
 * Class DupeMemberDeleteRequestFactory
 */
final class DupeMemberDeleteRequestFactory
    implements IDupeMemberActionAccountRequestFactory {

    /**
     * @param Member $primary_account
     * @param Member $dupe_account
     * @return IDupeMemberActionAccountRequest
     */
    public function build(Member $primary_account, Member $dupe_account)
    {
        $request = new DupeMemberDeleteRequest();
        $request->registerPrimaryAccount($primary_account);
        $request->registerDupeAccount($dupe_account);
        $request->generateConfirmationHash();
        return $request;
    }
}