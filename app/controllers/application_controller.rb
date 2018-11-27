class ApplicationController < ActionController::Base
  # NOTE: THIS MUST BE RE-ENABLED FOR PRODUCTION
  # protect_from_forgery with: :exception

  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    attributes = [:email, :first_name ,:last_name]
    devise_parameter_sanitizer.permit(:sign_up, keys: attributes)
    devise_parameter_sanitizer.permit(:account_update, keys: attributes)
  end
end
