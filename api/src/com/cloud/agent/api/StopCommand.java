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
package com.cloud.agent.api;

import com.cloud.vm.VirtualMachine;

public class StopCommand extends RebootCommand {
    String vnet;
    private boolean isProxy=false;
    private String urlPort=null;
    private String publicConsoleProxyIpAddress=null;
    private String privateRouterIpAddress=null;
    
    protected StopCommand() {
    }
    
    public StopCommand(VirtualMachine vm, boolean isProxy, String urlPort, String publicConsoleProxyIpAddress) {
    	super(vm);
    	this.isProxy = isProxy;
    	this.urlPort = urlPort;
    	this.publicConsoleProxyIpAddress = publicConsoleProxyIpAddress;
    }
    
    public StopCommand(VirtualMachine vm, String vnet) {
        super(vm);
        this.vnet = vnet;
    }
    
    public StopCommand(VirtualMachine vm, String vmName, String vnet) {
        super(vmName);
        this.vnet = vnet;
    }
    
    public StopCommand(VirtualMachine vm, String vmName, String vnet, String privateRouterIpAddress) {
        super(vmName);
        this.vnet = vnet;
        this.privateRouterIpAddress = privateRouterIpAddress;
    }
    
    public StopCommand(String vmName) {
        super(vmName);
    }
    
    public String getVnet() {
        return vnet;
    }
    
    @Override
    public boolean executeInSequence() {
        return true;
    }

	public boolean isProxy() {
		return this.isProxy;
	}
	
	public String getURLPort() {
		return this.urlPort;
	}
	
	public String getPublicConsoleProxyIpAddress() {
		return this.publicConsoleProxyIpAddress;
	}

    public String getPrivateRouterIpAddress() {
        return privateRouterIpAddress;
    }
}