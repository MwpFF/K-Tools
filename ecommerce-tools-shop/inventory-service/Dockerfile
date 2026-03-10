FROM eclipse-temurin:21-jdk-alpine AS build
WORKDIR /app

COPY pom.xml .
COPY shared/pom.xml shared/
COPY inventory-service/pom.xml inventory-service/
COPY order-service/pom.xml order-service/
COPY notification-service/pom.xml notification-service/

COPY shared shared
COPY inventory-service inventory-service

RUN apk add --no-cache maven && \
    mvn package -DskipTests -B -pl inventory-service -am

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/inventory-service/target/inventory-service-*-SNAPSHOT-exec.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
