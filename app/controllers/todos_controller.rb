class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  respond_to :json

  # GET /todos
  # GET /todos.json
  def index
    @todos = Todo.where(complete: false)
    @completed_todos = Todo.where(complete: true)
  end


  # POST /todos
  # POST /todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: 200
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    id_removed = @todo.id
    @todo.destroy
    render json: {id: id_removed}, status: 200
  end

  def remove_all_todos
    @todos = Todo.where(complete: false)
    @todos.each do |todo|
      todo.destroy
    end
    head 200
  end

  def mark_complete
    @todo = Todo.find(params[:id])
    @todo.update_attributes(complete: true)

    if @todo.save
      render json: @todo, status: 200
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:todo, :complete)
    end
end
