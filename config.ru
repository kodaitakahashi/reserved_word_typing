require 'bundler'
Bundler.setup

root = ::File.dirname(__FILE__)
require ::File.join(root, 'main')

run Main
