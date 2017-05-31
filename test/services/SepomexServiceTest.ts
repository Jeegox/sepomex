import {suite, test} from 'mocha-typescript';
import {SepomexService} from '../../src/services/SepomexService';
import {getLogger, Logger} from 'log4js';
import {Container, Inject} from 'typescript-ioc';
import {Exception} from '../../src/exceptions/Exception';

@suite('Sepomex service test suite')
class SepomexServiceTest {

    private logger: Logger = getLogger('tests');
    @Inject
    private sepomexService: SepomexService;

    @test('Assert start SepomexService tests')
    public assertInit() {
        try {
            this.sepomexService.readData('test');
        } catch (exception) {
            if (exception instanceof Exception) {
                this.logger.info(exception.message + exception.code)
            }
        }

        this.sepomexService.readData('test/resources/mock-sepomex.zip');
    }
}
