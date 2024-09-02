import { Icon } from 'solid-heroicons'
import { photo } from 'solid-heroicons/outline'
import { Component } from 'solid-js'

import { type ImageRecord } from '~/shared/db'
import { selectedRecord, setSelectedRecord } from '~/shared/store'
import { Button } from '~/shared/ui/button'

type SidebarItemProps = {
  item: ImageRecord
}

const SidebarItem: Component<SidebarItemProps> = (props) => {
  return (
    <Button
      variant={
        selectedRecord() && selectedRecord()?.id === props.item.id
          ? 'secondary'
          : 'outline'
      }
      class="h-8 justify-start px-3 shadow"
      onClick={() => {
        setSelectedRecord(props.item)
      }}
    >
      <Icon path={photo} class="mr-2 size-4 shrink-0" />
      <span class="truncate text-xs font-light">{props.item.name}</span>
    </Button>
  )
}

export default SidebarItem
