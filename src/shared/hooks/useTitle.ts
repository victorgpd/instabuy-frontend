import { useEffect } from 'react'

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `Instabuy - ${title}`
  }, [title])
}

export default useTitle
