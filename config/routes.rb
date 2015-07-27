Rails.application.routes.draw do
  resources :todos

  get '/remove_all_todos' => 'todos#remove_all_todos', as: :remove_all_todos
  post '/mark_complete' => 'todos#mark_complete', as: :mark_complete
  get '/hide_completed' => 'todos#hide_completed', as: :hide_completed

  root 'todos#index'
end
