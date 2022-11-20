
import {render} from "@testing-library/react";
import {ContentView} from "./ContentView";

describe("Content View", () => {
    it("should render component", () => {
        const {container} = render(<ContentView/>);
        expect(container).toBeInTheDocument();
    })
})