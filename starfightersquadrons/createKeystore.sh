#!/bin/sh

KEYSTORE=signing-jar.keystore

keytool -genkey -alias starfighterui -keystore $KEYSTORE -storepass starfighterui -keypass starfighterui -dname "CN=Jeffrey Thompson, OU=Vizzini.org, O=Vizzini.org, L=Lone Tree, S=CO, C=US"
keytool -selfcert -alias starfighterui -keystore $KEYSTORE -storepass starfighterui -keypass starfighterui
