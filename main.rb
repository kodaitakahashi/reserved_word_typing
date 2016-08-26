require 'sinatra/base'
require 'sinatra/config_file'
require 'slim'
require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'dev.db'
)

class Main < Sinatra::Base
  register Sinatra::ConfigFile
  config_file 'config.yml'

  get '/' do
    slim :index
  end

end
