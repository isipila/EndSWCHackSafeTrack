#!/bin/bash

set -e

export LC_ALL=en_US.UTF-8
export LANG=en_US.UTF-8

platform='unknown'
unamestr=`uname`
if [[ "$unamestr" == 'Linux' ]]; then
   platform='linux'
elif [[ "$unamestr" == 'Darwin' ]]; then
   platform='macosx'
else
	echo "Unsupported platform $unamestr"
	exit 1
fi

machine_cpu='unknown'
machine_unamestr=`uname -m`
if [[  "$machine_unamestr" == "x86_64" ]]; then
	machine_cpu='x64'
elif [[ "$machine_unamestr" == "i686" ]]; then
	machine_cpu='i586'
else
	echo "Unsupported CPU architecture $machine_unamestr"
	exit 1
fi

PROJECT_ROOT=$(pwd)
CACHE_DIR=/tmp/buildtools-cache
JDK_VERSION=7u45-$platform-$machine_cpu
MAVEN_VERSION=3.1.1
BUILD_TOOLS=$PROJECT_ROOT/buildtools

mkdir -p $CACHE_DIR

# Create the buildtools directory
rm -rf $BUILD_TOOLS
mkdir -p $BUILD_TOOLS
cd $BUILD_TOOLS

# Get the JDK
jdk_location=https://www.diacora.com/dl/jdk-$JDK_VERSION.tar.gz
local_jdk_location=$CACHE_DIR/jdk-$JDK_VERSION.tar.gz
if [ ! -e "$local_jdk_location" ]
then
    echo "Fetching JDK from $jdk_location"
    curl $jdk_location -o $local_jdk_location
fi

unpacked_jdk_root=$BUILD_TOOLS/jdk

mkdir -p $unpacked_jdk_root
cd $unpacked_jdk_root

tar zxf $local_jdk_location

export JAVA_HOME=$unpacked_jdk_root

# Get Maven
mvn_location=https://www.diacora.com/dl/apache-maven-$MAVEN_VERSION-bin.tar.gz
local_mvn_location=$CACHE_DIR/apache-maven-$MAVEN_VERSION-bin.tar.gz
if [ ! -e "$local_mvn_location" ]
then
    echo "Fetching Maven from $mvn_location"
    curl $mvn_location -o $local_mvn_location
fi

unpacked_mvn_root=$BUILD_TOOLS/maven

mkdir -p $unpacked_mvn_root
cd $unpacked_mvn_root

tar zxf $local_mvn_location

export M2_HOME=$unpacked_mvn_root

# Move back to the project root directory
cd $PROJECT_ROOT

# Build the project
$M2_HOME/bin/mvn -Djetty.port=8888 clean verify

ssh confhack@git.diacora.com "sudo service confhack stop"
scp hack-jetty/target/hack-jetty.jar confhack@git.diacora.com:confhack.jar
ssh confhack@git.diacora.com "sudo service confhack start"
