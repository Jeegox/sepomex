import {suite, test} from 'mocha-typescript';
import {configure, levels, setGlobalLogLevel} from 'log4js';

@suite('Bootstrap suite')
class BootstrapTest
{
    @test('Assert start Bootstrap tests')
    public assertInit()
    {
        configure('src/config/log4js_configuration.json');
        setGlobalLogLevel(levels.ALL);
    }
}
