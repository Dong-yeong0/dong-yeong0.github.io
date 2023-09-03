---
layout: post
title: "[ELK] ELK 란?"
date: 2023-04-14 20:46:00 +09:00
categories: [ELK, Elasticsearch]
tags: [ELK, Elasticsearch]
comments: true
---
![Untitled](https://assets-global.website-files.com/5e0fd4aa98f2dc47fcd00bb7/5e14d9029a07bd0ec2ed1c1e_Will-Migrating-to-the-Cloud-Save-Money-5.png)
_출처: [mission cloud](https://www.missioncloud.com/blog/what-is-elk-stack)_

## Intro

회사를 다니기 전 Log를 작성한 것은 오로지 console 창에 이런 것을 출력해보았습니다.

1. Javascript: `console.log("Hello world")`

2. Java: `System.out.println("Hello world!")`
  
이것을 통해 디버깅을 하고 code를 수정하는 작업을 하였는데, 

회사를 입사하고 난 뒤 **operations log**, **system log** 등 여러 데이터를 입력하고 저장해야 되는 상황과

IOT service를 만드는 중, sensor에서 주기적으로 전송을 하는 오는 data를 입력해야되는 상황이 오게 됩니다.

만약 운영을 하고 있는 시스템에서 장애가 발생한다거나, 결함이 발견되면 즉각 대응을 해야함으로 로그를 분석하게 됩니다.

개발기간 중 프로젝트에 장애가 일어나는 것과 운영기간 중 장애가 일어나는 것은 엄청난 차이가 있기에 빠르게 분석할 수 있어야 합니다.

## ELK 란?

### E → Elasticsearch

Elasticsearch는 Apache Lucene( 아파치 루씬 ) 기반의 Java 오픈소스 분산 검색 엔진입니다.

Elasticsearch는 검색을 위해 단독으로도 사용되며, ELK (**E**lasticsearch, **L**ogstash, **K**ibana) 스택으로도 사용됩니다.

Elasticsearch를 통해 루씬 라이브러리를 단독으로 사용할 수 있게 되었으며, 방대한 양의 데이터를 신속하게, 거의 실시간( NRT, Near Real Time )으로 저장, 검색, 분석할 수 있습니다.

문서를 수집, 수집한 문서를 검색하기 쉽게 **색인**하고 저장된 색인으로 부터 질의를 하면 해당 문서를 검색하여 결과로 제공합니다.

검색엔진의 개념과 조금 비슷합니다.

#### 동작

Elasticsearch의 index에 데이터를 적재하며, 색인 된 데이터를 검색하는 원리.

1. REST API를 통해 **JSON** 형태로 Elasticsearch에 전송합니다.
2. Elasticsearch가 해당 index의 `_source(데이터 배열)`에 해당하는 모든 필드를 조회하여 데이터를 저장합니다.
3. client -> REST API를 통해 검색(조회), 분석(집게)를 할 수 있는 질의 request하면 response로 해당 질의에 맞는 데이터를 응답합니다.

### L → Logstash

Logstash는 데이터 수집 pipeline tool 입니다.  ELK Stack의 첫번째 구성 요소로서, 데이터 입력을 받아 Elasticsearch에 제공합니다.

pipeline (input, output)의 역할

### K → Kibana

Kibana는 데이터 시각화 도구이다. Elasticserach 문서를 시각화 하는 데 사용되며 개발자가 이 문서를 즉시 파악할 수 있게 도와줍니다.

Kibana 대시보드는 Elasticsearch을 사용하여 수행되는 복잡한 쿼리를 시각화하기 위해 다양한 대화형 다이어그램, 지리공간 데이터, 타임라인 및 그래프를 제공합니다.

Kibana를 사용하여 특정 필요에 따라 사용자 지정 그래프를 만들고 저장할 수 있습니다.

### Install

[docker-compose file Github](https://github.com/Dong-yeong0/Dev/blob/main/ELK/docker-compose.yml)

복사 후 파일 위치에서

```shell
docker-compose up --build -d
```
