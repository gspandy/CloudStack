// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// Automatically generated by addcopyright.py at 04/03/2012
package com.cloud.network.firewall;

import java.util.List;

import com.cloud.api.commands.ListFirewallRulesCmd;
import com.cloud.exception.NetworkRuleConflictException;
import com.cloud.exception.ResourceUnavailableException;
import com.cloud.network.rules.FirewallRule;
import com.cloud.user.Account;

public interface FirewallService {
    FirewallRule createFirewallRule(FirewallRule rule) throws NetworkRuleConflictException;

    List<? extends FirewallRule> listFirewallRules(ListFirewallRulesCmd cmd);

    /**
     * Revokes a firewall rule
     * 
     * @param ruleId
     *            the id of the rule to revoke.
     * @return
     */
    boolean revokeFirewallRule(long ruleId, boolean apply);

    boolean applyFirewallRules(long ipId, Account caller) throws ResourceUnavailableException;

    FirewallRule getFirewallRule(long ruleId);

    boolean revokeRelatedFirewallRule(long ruleId, boolean apply);

}