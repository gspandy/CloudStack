#!/usr/bin/env bash
# Copyright 2012 Citrix Systems, Inc. Licensed under the
# Apache License, Version 2.0 (the "License"); you may not use this
# file except in compliance with the License.  Citrix Systems, Inc.
# reserves all rights not expressly granted by the License.
# You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
# 
# Automatically generated by addcopyright.py at 04/03/2012



 

# clearUsageRules.sh - remove iptable rules for removed public interfaces
# @VERSION@

if [ -f /root/removedVifs ]
then
    var=`cat /root/removedVifs`
    # loop through even vif to be cleared
    for i in $var; do
        # Make sure vif doesn't exist
        if [ ! -f /sys/class/net/$i ]
        then
            # remove rules
            iptables -D NETWORK_STATS -i eth0 -o $i > /dev/null;
            iptables -D NETWORK_STATS -i $i -o eth0 > /dev/null;
            iptables -D NETWORK_STATS -o $i ! -i eth0 -p tcp > /dev/null;
            iptables -D NETWORK_STATS -i $i ! -o eth0 -p tcp > /dev/null;
        fi
    done
rm /root/removedVifs
fi