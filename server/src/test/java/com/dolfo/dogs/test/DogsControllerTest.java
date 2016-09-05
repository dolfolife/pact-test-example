package com.dolfo.dogs.test;

import com.pivotallabs.chicago.pact.provider.spring.mockmvc.PactProviderVerifier;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Collections;
import java.util.List;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.mock;

@RunWith(MockitoJUnitRunner.class)
public class DogsControllerTest {

    @Test
    public void getDogs_returnsListOfCurrentDogs() throws Exception {
        DogsService mockDogsService = mock(DogsService.class);
        List dogs = Collections.singletonList(new Dog(1));
        String pactFile = "pacts/myconsumer-myprovider.json";
        doReturn(dogs).when(mockDogsService).getAllDogs();

        DogsController dogsController = new DogsController(mockDogsService);

        PactProviderVerifier.verifyPact(pactFile, dogsController);
    }
}