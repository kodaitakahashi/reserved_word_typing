require 'sinatra/base'
require 'sinatra/config_file'
require 'slim'
require 'active_record'
require './models/reserved_word'

class Main < Sinatra::Base
  register Sinatra::ConfigFile
  config_file 'config.yml'

  get '/' do
    slim :index
  end

  get '/quesions/:id' do
    ReservedWords.select(:id, :word, :description).where(program_id: params[:id]).to_json
  end

end
