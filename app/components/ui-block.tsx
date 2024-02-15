import { Blocks } from "@/types";
import IfElseCanvas from "./canvas/control/IfElseCanvas";
import ForCanvas from "./canvas/control/ForCanvas";
import WhileCanvas from "./canvas/control/WhileCanvas";

interface blockProps {
    id: Blocks,

}

export default function UiBlock({ id }: blockProps) {
    switch (id) {
        case (Blocks.IfElse): {
            return (
                <IfElseCanvas />
            )
        }
        case (Blocks.ForLoop): {
            return (
                <ForCanvas />
            )
        }
        case (Blocks.WhileLoop): {
            return (
                <WhileCanvas />
            )
        }
        case (Blocks.BuyOrder): {
            return (
                <div>buy</div>
            )
        }
        case (Blocks.SellOrder): {
            return (
                <div>sell</div>
            )
        }
    }
}