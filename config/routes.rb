Rails.application.routes.draw do
  resources :goals
  devise_for :users
  root to: 'home#index'
end
