import mongoose from "mongoose";
import order from "../models/Orders.js"

const Order = mongoose.model("Order", order)

class OrderService{

    Create(code, total){
        const newOrder = new Order(
            {
                code:code,
                total:total
            }
        )
        newOrder.save()
    }

    GetAll(){
        const orders = Order.find()
        return orders
    }

    GetOne(id) {
        const orders = Order.findOne({_id: id})
        return orders
    }

    Delete(id) {
        Order.findByIdAndDelete(id).then(() => {
            console.log(`Pedido com a id: ${id} foi deletado.`)
        }).catch(err => {
            console.log(err)
        })
    }

    Update(id, code, total) {
        Order.findByIdAndUpdate(id, {
            code: code,
            total: total
        }).then(() => {
            console.log(`Dados do pedido com id: ${id} alterados com sucesso.`)
        }).catch(err => {
            console.log(err)
        })
    }
}

export default new OrderService()