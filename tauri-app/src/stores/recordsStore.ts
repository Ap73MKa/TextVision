import { createSignal } from 'solid-js'
import { createStore } from 'solid-js/store'
import { RecordType } from '@/shared/RecordType'

export const [records, setRecords] = createStore<RecordType[]>([])
export const [selectedRecord, setSelectedRecord] = createSignal<RecordType>()

export const addRecordStore = (record: RecordType) => {
  setRecords([...records, record])
}

export const deleteRecordStore = (id: number) => {
  setRecords(records.filter((item) => item.id !== id))
}

export const getRecordStore = (id: number) => {
  return records.find((record) => record.id === id)
}

export const updateRecordStore = (updatedRecord: RecordType) => {
  setRecords(
    records.map((record) =>
      record.id === updatedRecord.id ? updatedRecord : record
    )
  )
}
