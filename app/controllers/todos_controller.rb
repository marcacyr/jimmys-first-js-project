class TodosController < ApplicationController
  before_action :set_todo, only: [:show, :edit, :update, :destroy]

  respond_to :json

  # GET /todos
  # GET /todos.json
  def index
    @todos = Todo.all
  end

  # GET /todos/1
  # GET /todos/1.json
  def show
  end

  # GET /todos/new
  def new
    @todo = Todo.new

  end

  # GET /todos/1/edit
  def edit
  end

  # POST /todos
  # POST /todos.json
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: 200
    else
      format.json { render json: @todo.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /todos/1
  # DELETE /todos/1.json
  def destroy
    set_todo
    id_removed = @todo.id
    @todo.destroy
    render json: {id: id_removed}, status: 200
  end

  def remove_all_todos
    Todo.destroy_all
    head 200
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_todo
      @todo = Todo.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_params
      params.require(:todo).permit(:message)
    end
end
