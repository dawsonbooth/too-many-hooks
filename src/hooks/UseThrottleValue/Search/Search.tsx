import type React from 'react'
import { useMemo } from 'react'
import BOOK_NAMES from '../../../storybook-common/assets/book-names.json'
import useThrottleValue from '../useThrottleValue'

interface Props {
  search: string
}

const Input: React.FC<Props> = ({ search }) => {
  const throttledSearch = useThrottleValue(search.toLowerCase(), 1000)
  const filteredBooks = useMemo(
    () => BOOK_NAMES.filter(name => name.toLowerCase().includes(throttledSearch)),
    [throttledSearch],
  )

  return (
    <div className="prose flex flex-col items-center gap-4">
      <h2>
        {!throttledSearch
          ? 'Enter a search query to filter books'
          : `Books with names containing "${throttledSearch}":`}
      </h2>
      {filteredBooks.length ? (
        <div className="flex max-w-lg flex-col border border-slate-500">
          {filteredBooks.map(name => (
            <div key={name} className="w-full border border-slate-500 p-2">
              {name}
            </div>
          ))}
        </div>
      ) : (
        <div>No matching book titles</div>
      )}
    </div>
  )
}

export default Input
