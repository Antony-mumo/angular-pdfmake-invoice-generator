import { Component } from '@angular/core';

import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

class Product{
  name: string;
  price: number;
  qty: number;
}
class Invoice{
  customerName: string;
  address: string;
  contactNo: number;
  email: string;

  products: Product[] = [];
  additionalDetails: string;

  constructor(){
    // Initially one empty product row we will show
    this.products.push(new Product());
  }
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  invoice = new Invoice();

  generatePDF(action = 'open') {
    let docDefinition = {
      content: [
        {
          text: 'Sample Invoice',
          fontSize: 16,
          alignment: 'left',
          color: '#010606',
          marginBottom: 10,
        },
        // {
        //   text: 'INVOICE',
        //   fontSize: 25,
        //   bold: true,
        //   alignment: 'left',
        //   decoration: 'underline',
        //   color: '#010606'
        // },
        {
          text: 'INVOICE',
          marginTop: 5,
          fontSize: 25,
          alignment: 'left',
          // style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.invoice.customerName,
                bold:true
              },
              { text: this.invoice.address },
              { text: this.invoice.email },
              { text: this.invoice.contactNo }
            ],
            [
              {
                text: `Date: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              {
                text: `Bill No : ${((Math.random() *1000).toFixed(0))}`,
                alignment: 'right'
              }
            ]
          ]
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto'],
            body: [
              [{text: 'Product', fillColor: '#ECC8AC', bold: true}, {text: 'Price', fillColor: '#ECC8AC', bold: true}, {text: 'Quantity', fillColor: '#ECC8AC', bold: true}, {text: 'Amount', fillColor: '#ECC8AC', bold: true}],
              ...this.invoice.products.map(p => ([{text: p.name}, {text: p.price}, {text: p.qty}, {text: (p.price*p.qty).toFixed(2), }])),
              [{text: 'Total Amount', colSpan: 3, fillColor: '#ECC8AC', bold: true}, {}, {}, {text: this.invoice.products.reduce((sum, p)=> sum + (p.qty * p.price), 0).toFixed(2), fillColor: '#ECC8AC'}]
            ]
          }
        },
        {
          text: 'Terms and Conditions',
          style: 'sectionHeader'
        },
        {
            ul: ['Terms and conditions go here'],
        }
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15,0, 15]
        }
      }
    };

    if(action==='download'){
      pdfMake.createPdf(docDefinition).download();
    }else if(action === 'print'){
      pdfMake.createPdf(docDefinition).print();
    }else{
      pdfMake.createPdf(docDefinition).open();
    }

  }

  addProduct(){
    this.invoice.products.push(new Product());
  }

}
