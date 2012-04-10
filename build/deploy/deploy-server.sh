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



 

# deploy.sh -- deploys a management server

usage() {
  printf "Usage: %s: -d [tomcat directory to deploy to] -z [zip file to use]\n" $(basename $0) >&2
}

dflag=
zflag=
tflag=
iflag=

deploydir=
zipfile="client.zip"
typ=

#set -x

while getopts 'd:z:x:h:' OPTION
do
  case "$OPTION" in
  d)	dflag=1
	deploydir="$OPTARG"
		;;
  z)    zflag=1
        zipfile="$OPTARG"
                ;;
  h)    iflag="$OPTARG"
                ;;
  ?)	usage
		exit 2
		;;
  esac
done

if [ "$deploydir" == "" ]
then 
    if [ "$CATALINA_HOME" == "" ]
    then
        printf "Tomcat Directory to deploy to: "
        read deploydir
    else
        deploydir="$CATALINA_HOME"
    fi
fi

if [ "$deploydir" == "" ]
then 
   printf "Tomcat directory was not specified\n";
   exit 15;
fi

printf "Check to see if the Tomcat directory exist: $deploydir\n"
if [ ! -d $deploydir ]
then
    printf "Tomcat directory does not exist\n";
    exit 16;
fi

if [ "$zipfile" == "" ]
then 
    printf "Path of the zip file [defaults to client.zip]: "
    read zipfile
    if [ "$zipfile" == "" ]
    then
        zipfile="client.zip"
    fi
fi
if ! unzip -o $zipfile client.war 
then
  exit 6
fi

rm -fr $deploydir/webapps/client

if ! unzip -o ./client.war -d $deploydir/webapps/client
then
   exit 10;
fi

rm -f ./client.war

if ! unzip -o $zipfile lib/* -d $deploydir
then
   exit 11;
fi

if ! unzip -o $zipfile conf/* -d $deploydir
then
    exit 12;
fi

if ! unzip -o $zipfile bin/* -d $deploydir
then
    exit 13;
fi

printf "Adding the conf directory to the class loader for tomcat\n"
sed 's/shared.loader=$/shared.loader=\$\{catalina.home\},\$\{catalina.home\}\/conf\
/' $deploydir/conf/catalina.properties > $deploydir/conf/catalina.properties.tmp
mv $deploydir/conf/catalina.properties.tmp $deploydir/conf/catalina.properties

printf "Installation is now complete\n"
exit 0