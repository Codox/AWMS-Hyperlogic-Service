package main

import (
	"awms-be/internal/config"
	"database/sql"
	"github.com/gin-gonic/gin"
	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	gormPg "gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"gorm.io/gorm/schema"
	"log"
)

var db *gorm.DB

func main() {
	cfg := config.Load()

	// Connect to Postgres
	db, err := gorm.Open(gormPg.Open(cfg.PostgresURI), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Info),
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})

	if err != nil {
		log.Fatalln(err)
	}

	sqlDB, err := db.DB()
	if err != nil {
		log.Fatalln(err)
	}

	log.Printf("Running migrations - before")

	runMigrations(sqlDB)

	log.Printf("Running migrations - after")

	r := gin.Default()

	// routes.SetupRoutes(r, pool)

	r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}

func runMigrations(db *sql.DB) {
	driver, err := postgres.WithInstance(db, &postgres.Config{})

	log.Printf("Running migrations")
	if err != nil {
		log.Fatalln(err)
	}

	m, err := migrate.NewWithDatabaseInstance(
		"file://db/migrations",
		"postgres", driver)

	log.Printf("Running migrations - after new instance")

	if err != nil {
		log.Fatalln(err)

	}
	m.Up()
	log.Printf("Running migrations - RUN")

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		log.Fatalln(err)
	}
}
