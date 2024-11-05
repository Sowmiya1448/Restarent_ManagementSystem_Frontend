 
 
    //*** Stock update in laptop update page */

    
            // let result =[]

            // if(stocklist.length>0)
            // {
            //    result = stocklist.find(st =>st.laptop_reference === id)
                   
            //    console.log(result,"stock_id")
               
            // }

        //  const stockdata = {

        //         laptop_reference:id,
               
        //       }

        //        axios.patch(`http://127.0.0.1:8001/stock/${result._id}`,stockdata) 
        //        .then(response =>{
        
        //         console.log(response.data)
        //         navigate('/laptop/')
        
        //         })  
             
        //     .catch(error =>console.log(error))  



        //***BILL LIST STOCK UPDATE */



        // for (let st of stock_data) {

        //     for (let stocky of stock) {
        //         if (st.laptop_reference === stocky.lap_id) {

        //             const data = {

        //                 stocklist: st.stocklist - stocky.quantity


        //             }

        //             axios.patch(`http://127.0.0.1:8001/stock/${st._id}`, data)
        //                 .then(response => {
        //                     console.log(response.data, "stock in bill")
        //                 })
        //                 .catch(error => console.log(error))
        //         }
        //     }

        // }





        //****API IN BILL UPDATE STOCK */

        const data = {

            stocklist: st.stocklist - stocky.quantity


        }

        axios.patch(`http://127.0.0.1:8001/stock/${st._id}`, data)
            .then(response => {
                console.log(response.data, "stock in bill")
            })
            .catch(error => console.log(error))


            //*******bill update**********
            const updateBill = (event) => {

                event.preventDefault()
                const data = [{
        
                    billno: billnumber,
                    bill_date: billdate,
                    customer_ref: customer_id
                },
                    billproduct
                ]
        
                axios.patch(`http://127.0.0.1:8001/bill/${id}`, data)
                    .then(response => {
                        console.log(response.data)
                        navigate('/bill_list')
        
                    })
                    .catch(error => console.log(error));
        
        
                for (let st of stock_data) {
        
                    for (let stocky of stock) {
                        if (st.laptop_reference === stocky.lap_id) {
                            let variable = Number(st.stocklist)
                            if (stocky.update && stocky.existing) {
                                for (let ex of exquantiy) {
                                    if (ex.laptop_reference === stocky.lap_id) {
                                        variable += (Number(exquantiy) - Number(stock.quantity))
                                    }
                                    else {
                                        for (let ex of exquantiy) {
                                            if (ex.laptop_reference === stocky.lap_id) {
                                                if (ex.quantiy < stocky.quantity) {
                                                    let variable2 = Number(stocky.quantity) - Number(ex.quantity)
        
                                                    variable -= variable2
                                                }
                                                else {
        
                                                    let variable2 = Number(stocky.quantity) - Number(ex.quantity)
        
                                                    variable += variable2
        
                                                }
                                            }
                                        }
                                    }
        
                                    const data = {
        
                                        stocklist: variable
                                    }
        
        
                                    axios.patch(`http://127.0.0.1:8001/stock/${st._id}`, data)
                                        .then(response => {
                                            console.log(response.data, "stock in bill")
                                        })
                                        .catch(error => console.log(error))
        
        
        
                                }
                            }
        
                        }
                    }
                }
            }
        