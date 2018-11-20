Rails.application.routes.draw do
  resources :goals

  resources :entries do
    resource :answers, only: [:show]
  end

  devise_for :users

  get 'cards', to: 'home#cards'
  root to: 'home#index'
end

