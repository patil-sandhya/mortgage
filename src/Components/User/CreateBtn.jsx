import React from 'react'
import { Plus } from 'lucide-react'
const CreateBtn = ({handleCreate,name}) => {
  return (
    <>
     <button
  className="fixed bottom-8 right-6 z-20 px-4 py-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors flex items-center gap-2 "
  onClick={handleCreate}
>
  <Plus className="w-4 h-4" />
  {name}
</button>
    </>
  )
}

export default CreateBtn