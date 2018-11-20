Rails.application.routes.draw do
  resources :goals

  resources :entries do
    resource :answers, only: [:show]
  end

  devise_for :users
    root to: 'home#index'
end
