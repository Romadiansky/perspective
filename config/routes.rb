Rails.application.routes.draw do
  resources :goals
  resources :entries
  devise_for :users
  root to: 'home#index'
end
