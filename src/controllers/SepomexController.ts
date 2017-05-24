import {Controller, Get} from 'ts-express-decorators';

@Controller('/v1/sepomex')
export class SepomexController {

    @Get('')
    public indexAction() {
        return true;
    }
}
