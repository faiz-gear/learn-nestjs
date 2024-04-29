/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useMutation, useQuery } from '@apollo/client'
import './App.css'

const GET_TODO_LIST = gql`
  query getTodoList {
    todoList {
      id
      content
      isDone
    }
  }
`

const CREATE_TODO_ITEM = gql`
  mutation CreateTodoItem($todoItem: CreateTodoItemInput!) {
    createTodoItem(todoItem: $todoItem) {
      id
      content
      isDone
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_TODO_LIST)
  const [createTodo] = useMutation(CREATE_TODO_ITEM, {
    refetchQueries: [{ query: GET_TODO_LIST }]
  })

  const onClick = () => {
    createTodo({
      variables: {
        todoItem: {
          content: 'new todo' + Math.random()
        }
      }
    })
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>
  return (
    <>
      <button onClick={onClick}>新增</button>
      <p>
        {data?.todoList?.map((item: any) => {
          return <li key={item.id}>{item.content}</li>
        })}
      </p>
    </>
  )
}

export default App
