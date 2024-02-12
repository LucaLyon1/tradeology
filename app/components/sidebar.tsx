import ForBlock from "./code/control/forblock";
import IfBlock from "./code/control/ifblock";
import WhileBlock from "./code/control/whileblock";
import BuyOrder from "./code/orders/buyorder";
import SellOrder from "./code/orders/sellOrder";

export default function Sidebar() {
    return (
        <div className="h-screen mx-2 my-2">
            <ForBlock />
            <IfBlock />
            <WhileBlock />
            <SellOrder />
            <BuyOrder />
        </div>
    )
}