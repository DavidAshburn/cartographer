class Endpoint < ApplicationRecord
	belongs_to :switch
	belongs_to :plugboard
	belongs_to :wallplate
end
