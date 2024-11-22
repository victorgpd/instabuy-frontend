import React from 'react'
import { Table as AntdTable } from 'antd'
import type { TableProps as AntdTableProps } from 'antd'

export interface DataSourceType {
  key: string
  id: string
  name: string
  image: string
  category: string
  linkOriginal: string
  linkAffiliate: string
  price: string
  priceOld: string
  cupom: string
}

interface TableProps {
  dataSource: DataSourceType[]
  columns: { title: string; dataIndex: string; key: string }[]
  setProductSelected?: React.Dispatch<
    React.SetStateAction<DataSourceType[] | undefined>
  >
  width?: string
  height?: string
  maxwidth?: string
  maxheight?: string
}

const Table = (props: TableProps) => {
  const rowSelection: AntdTableProps<DataSourceType>['rowSelection'] = {
    onChange: (
      selectedRowKeys: React.Key[],
      selectedRows: DataSourceType[]
    ) => {
      if (props.setProductSelected) {
        props.setProductSelected(selectedRows)
      }
    },
    getCheckboxProps: (record: DataSourceType) => ({
      disabled: record.name === 'Disabled User',
      name: record.name,
    }),
  }

  return (
    <>
      {props.setProductSelected ? (
        <AntdTable<DataSourceType>
          rowSelection={{ type: 'radio', ...rowSelection }}
          dataSource={props.dataSource}
          columns={props.columns}
          style={{
            width: props.width,
            maxWidth: props.maxwidth,
            height: props.height,
            maxHeight: props.maxheight,
          }}
        />
      ) : (
        <AntdTable<DataSourceType>
          dataSource={props.dataSource}
          columns={props.columns}
          style={{
            width: props.width,
            maxWidth: props.maxwidth,
            height: props.height,
            maxHeight: props.maxheight,
          }}
        />
      )}
    </>
  )
}

export default Table
