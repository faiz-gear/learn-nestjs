const { Workbook } = require('exceljs')

async function importExcel() {
  const workbook = new Workbook()

  const workbooks2 = await workbook.xlsx.readFile('data.xlsx')

  workbooks2.eachSheet((sheet, sheetId) => {
    console.log('工作表' + sheetId)

    // sheet.eachRow((row, rowNumber) => {
    //   const rowData = []

    //   row.eachCell((cell, colNumber) => {
    //     rowData.push(cell.value)
    //   })

    //   console.log('第' + rowNumber + '行', rowData)
    // })

    const value = sheet.getSheetValues()
    console.log(value)
  })
}

// importExcel()

async function ExportExcel() {
  const workbook = new Workbook()

  const worksheet = workbook.addWorksheet('My Sheet')

  worksheet.columns = [
    { header: 'Id', key: 'id', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'D.O.B.', key: 'dob', width: 15 }
  ]

  worksheet.addRow({ id: 1, name: 'John Doe', dob: new Date(1970, 1, 1) })
  worksheet.addRow({ id: 2, name: 'Jane Doe', dob: new Date(1965, 1, 7) })

  worksheet.eachRow((row, rowIndex) => {
    row.eachCell((cell) => {
      if (rowIndex === 1) {
        cell.style = {
          font: {
            size: 10,
            bold: true,
            color: { argb: 'ffffff' }
          },
          alignment: { vertical: 'middle', horizontal: 'center' },
          fill: {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '000000' }
          },
          border: {
            top: { style: 'dashed', color: { argb: '0000ff' } },
            left: { style: 'dashed', color: { argb: '0000ff' } },
            bottom: { style: 'dashed', color: { argb: '0000ff' } },
            right: { style: 'dashed', color: { argb: '0000ff' } }
          }
        }
      } else {
        cell.style = {
          font: {
            size: 10,
            bold: true
          },
          alignment: { vertical: 'middle', horizontal: 'left' },
          border: {
            top: { style: 'dashed', color: { argb: '0000ff' } },
            left: { style: 'dashed', color: { argb: '0000ff' } },
            bottom: { style: 'dashed', color: { argb: '0000ff' } },
            right: { style: 'dashed', color: { argb: '0000ff' } }
          }
        }
      }
    })
  })

  await workbook.xlsx.writeFile('data-export.xlsx')
}

ExportExcel()
