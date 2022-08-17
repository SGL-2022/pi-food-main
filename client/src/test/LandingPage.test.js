import LandingPage from "../components/LandingPage/LandingPage";
import Enzyme, {shallow} from "enzyme"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"

Enzyme.configure({adapter: new Adapter()});

describe('LandingPage',()=>{
    it("Debe tener un texto con recetas",()=>{
        const landing = shallow(<LandingPage/>)
        const title = landing.find('div h1')
        expect(title.text()).toBe("•. Recetas .•")
    })
    it("Debe tener un boton ingresar",()=>{
        const landing = shallow(<LandingPage/>)
        const button = landing.find('div Link span')
        expect(button.text()).toBe("INGRESAR")
    })
})