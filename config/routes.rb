Rails.application.routes.draw do
  resources :todos

  get '/remove_all_todos' => 'todos#remove_all_todos', as: :remove_all_todos

  root 'todos#index'
end
