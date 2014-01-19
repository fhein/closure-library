// Copyright 2008 The Closure Library Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('goog.cryptTest');
goog.setTestOnly('goog.cryptTest');

goog.require('goog.crypt');
goog.require('goog.testing.jsunit');

var UTF8_RANGES_BYTE_ARRAY = [
  0x00,
  0x7F,
  0xC2, 0x80,
  0xDF, 0xBF,
  0xE0, 0xA0, 0x80,
  0xEF, 0xBF, 0xBF];

var UTF8_RANGES_STRING = '\u0000\u007F\u0080\u07FF\u0800\uFFFF';

function testStringToUtf8ByteArray() {
  // Known encodings taken from Java's String.getBytes("UTF8")

  assertArrayEquals('ASCII',
      [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100],
      goog.crypt.stringToUtf8ByteArray('Hello, world'));

  assertArrayEquals('Latin',
      [83, 99, 104, 195, 182, 110],
      goog.crypt.stringToUtf8ByteArray('Sch\u00f6n'));

  assertArrayEquals('limits of the first 3 UTF-8 character ranges',
      UTF8_RANGES_BYTE_ARRAY,
      goog.crypt.stringToUtf8ByteArray(UTF8_RANGES_STRING));
}

function testUtf8ByteArrayToString() {
  // Known encodings taken from Java's String.getBytes("UTF8")

  assertEquals('ASCII', 'Hello, world', goog.crypt.utf8ByteArrayToString(
      [72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100]));

  assertEquals('Latin', 'Sch\u00f6n', goog.crypt.utf8ByteArrayToString(
      [83, 99, 104, 195, 182, 110]));

  assertEquals('limits of the first 3 UTF-8 character ranges',
      UTF8_RANGES_STRING,
      goog.crypt.utf8ByteArrayToString(UTF8_RANGES_BYTE_ARRAY));
}

function testByteArrayToString() {
  assertEquals('', goog.crypt.byteArrayToString([]));
  assertEquals('abc', goog.crypt.byteArrayToString([97, 98, 99]));
}

function testHexToByteArray() {
  assertElementsEquals(
      [202, 254, 222, 173],
      // Java magic number
      goog.crypt.hexToByteArray('cafedead'));

  assertElementsEquals(
      [222, 173, 190, 239],
      // IBM magic number
      goog.crypt.hexToByteArray('DEADBEEF'));
}

function testByteArrayToHex() {
  assertEquals(
      // Java magic number
      'cafedead',
      goog.crypt.byteArrayToHex([202, 254, 222, 173]));

  assertEquals(
      // IBM magic number
      'deadbeef',
      goog.crypt.byteArrayToHex([222, 173, 190, 239]));
}

function testXorByteArray() {
  assertElementsEquals(
      [20, 83, 96, 66],
      goog.crypt.xorByteArray([202, 254, 222, 173], [222, 173, 190, 239]));
}
