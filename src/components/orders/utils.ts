import { Order } from "@/src/app/types";
import Colors from "@/src/constants/Colors";

export const getOrderStatus = (order: Order) => {
    const statusColor = order.status === 'Delivered' ? Colors.light.success : order.status === 'New' ? Colors.light.tint : order.status === 'Cooking' ? Colors.light.warning : Colors.light.pending
    return statusColor
}