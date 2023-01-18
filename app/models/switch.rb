class Switch < ApplicationRecord
	has_many :switches
	has_many :endpoints
	belongs_to :switch

end
