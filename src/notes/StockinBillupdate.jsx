// let variable = 0

        // for (let st of stock_data) {

        //     for (let stocky of stock)
        //          {
        //         if (st.laptop_reference === stocky.lap_id)
        //              {

        //             for (let ex of exquantiy)
        //                  {
        //                 if ((stocky.update === false) && (stocky.existing === true)) 
        //                     {

        //                     variable = Number(st.stocklist) + Number(ex.quantity)

        //                 }
        //                 else {
        //                     if (ex.quantiy < stocky.quantity) {

        //                         let variable2 = Number(stocky.quantity) - Number(ex.quantity)

        //                         variable = st.stocklist - variable2

        //                     }
        //                     else {

        //                         let variable2 = Number(stocky.quantity) - Number(ex.quantity)

        //                         variable = st.stocklist + variable2

        //                     }
        //                 }
        //             }


        //             const data = {

        //                 stocklist: variable
        //             }

        //             axios.patch(`http://127.0.0.1:8001/stock/${st._id}`, data)
        //                 .then(response => {
        //                     console.log(response.data)
        //                 })
        //                 .catch(error => console.log(error))
        //         }
        //     }

        // }




        //********payment update  */

        // let payment = paymentlist.find(pay =>pay.customer_ref === data.bill_data.customer_ref)

        // console.log(payment,"pay")

        // let status =""

        // if(payment.customer_ref === data.bill_data.customer_ref)
        // {

        // if(data.bill_data.bill_amount >=payment.paid) { 

        //     status = "paid"

        //     const datapay = {
        //         paid:payment.paid - data.bill_data.bill_amount
        //     }

        //     axios.patch(`http://127.0.0.1:8001/payment${payment._id}`,datapay)
        //     .then(response => {
        //         console.log(response.data, "pk")
               
        //     })
        //     .catch(error => console.log(error))
            

        // }
        
        // else if(data.bill_data.bill_amount < payment.paid &&   payment.paid>0) status = "partially paid"

        // else  status ="unpaid"