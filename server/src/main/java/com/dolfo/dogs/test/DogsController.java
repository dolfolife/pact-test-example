package com.dolfo.dogs.test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
public class DogsController {

    private DogsService dogsService;

    @Autowired
    public DogsController(DogsService dogsService) {
        this.dogsService = dogsService;
    }

    @RequestMapping("/dogs")
    public ResponseEntity getDogs() {

        List allDogs = dogsService.getAllDogs();
        ResponseEntity responseEntity = new ResponseEntity(allDogs, HttpStatus.OK);
        return responseEntity;
    }

}
