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
package com.cloud.agent.resource.computing;

public class LibvirtStoragePoolDef {
	public enum poolType {
		ISCSI("iscsi"), NETFS("netfs"), LOGICAL("logical"), DIR("dir");
		String _poolType;

		poolType(String poolType) {
			_poolType = poolType;
		}

		@Override
		public String toString() {
			return _poolType;
		}
	}

	private poolType _poolType;
	private String _poolName;
	private String _uuid;
	private String _sourceHost;
	private String _sourceDir;
	private String _targetPath;

	public LibvirtStoragePoolDef(poolType type, String poolName, String uuid,
			String host, String dir, String targetPath) {
		_poolType = type;
		_poolName = poolName;
		_uuid = uuid;
		_sourceHost = host;
		_sourceDir = dir;
		_targetPath = targetPath;
	}

	public String getPoolName() {
		return _poolName;
	}

	public poolType getPoolType() {
		return _poolType;
	}

	public String getSourceHost() {
		return _sourceHost;
	}

	public String getSourceDir() {
		return _sourceDir;
	}

	public String getTargetPath() {
		return _targetPath;
	}

	@Override
	public String toString() {
		StringBuilder storagePoolBuilder = new StringBuilder();
		storagePoolBuilder.append("<pool type='" + _poolType + "'>\n");
		storagePoolBuilder.append("<name>" + _poolName + "</name>\n");
		if (_uuid != null)
			storagePoolBuilder.append("<uuid>" + _uuid + "</uuid>\n");
		if (_poolType == poolType.NETFS) {
			storagePoolBuilder.append("<source>\n");
			storagePoolBuilder.append("<host name='" + _sourceHost + "'/>\n");
			storagePoolBuilder.append("<dir path='" + _sourceDir + "'/>\n");
			storagePoolBuilder.append("</source>\n");
		}
		storagePoolBuilder.append("<target>\n");
		storagePoolBuilder.append("<path>" + _targetPath + "</path>\n");
		storagePoolBuilder.append("</target>\n");
		storagePoolBuilder.append("</pool>\n");
		return storagePoolBuilder.toString();
	}
}