require 'sqlite3'
require 'sinatra/activerecord'

ActiveRecord::Base.configurations = YAML.load_file('config/database.yml')
ActiveRecord::Base.establish_connection(:development)

class ReservedWords < ActiveRecord::Base; end
