# URL Verification Script for Precise Analytics
# Tests all URLs and verifies redirects

$baseUrl = "https://preciseanalytics.io"

# URLs that should work (200 OK)
$validUrls = @(
    "/",
    "/about-us",
    "/services",
    "/solutions",
    "/contact",
    "/careers",
    "/team",
    "/capabilities-statement",
    "/sectors",
    "/sectors/healthcare",
    "/sectors/finance",
    "/sectors/manufacturing",
    "/sectors/retail",
    "/schedule-consult",
    "/privacy-policy",
    "/terms-of-service",
    "/cookies-policy"
)

# URLs that should redirect (301/302)
$redirectUrls = @{
    "/about-us/team" = "/team"
    "/our-team" = "/team"
    "/blog" = "/"
    "/features" = "/services"
    "/pricing" = "/schedule-consult"
    "/certifications" = "/capabilities-statement"
    "/Industries" = "/sectors"
    "/industries" = "/sectors"
}

Write-Host "`n=== Testing Valid URLs ===" -ForegroundColor Green
foreach ($path in $validUrls) {
    $url = "$baseUrl$path"
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
        $status = $response.StatusCode
        
        if ($status -eq 200) {
            Write-Host "✓ $path - OK (200)" -ForegroundColor Green
        } else {
            Write-Host "✗ $path - Unexpected status: $status" -ForegroundColor Yellow
        }
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        Write-Host "✗ $path - Error: $status" -ForegroundColor Red
    }
}

Write-Host "`n=== Testing Redirects ===" -ForegroundColor Cyan
foreach ($source in $redirectUrls.Keys) {
    $url = "$baseUrl$source"
    $expectedDest = $redirectUrls[$source]
    
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -UseBasicParsing -MaximumRedirection 0 -ErrorAction SilentlyContinue
    } catch {
        $status = $_.Exception.Response.StatusCode.value__
        $location = $_.Exception.Response.Headers.Location
        
        if ($status -eq 301 -or $status -eq 302 -or $status -eq 308) {
            if ($location -like "*$expectedDest*") {
                Write-Host "✓ $source → $expectedDest ($status)" -ForegroundColor Green
            } else {
                Write-Host "⚠ $source → $location (expected $expectedDest)" -ForegroundColor Yellow
            }
        } else {
            Write-Host "✗ $source - Not redirecting (Status: $status)" -ForegroundColor Red
        }
    }
}

Write-Host "`n=== Testing Sitemap ===" -ForegroundColor Magenta
try {
    $sitemapUrl = "$baseUrl/sitemap.xml"
    $response = Invoke-WebRequest -Uri $sitemapUrl -UseBasicParsing
    
    if ($response.StatusCode -eq 200) {
        Write-Host "✓ Sitemap accessible" -ForegroundColor Green
        
        # Count URLs in sitemap
        $urlCount = ([regex]::Matches($response.Content, "<loc>")).Count
        Write-Host "  URLs in sitemap: $urlCount" -ForegroundColor Gray
        
        # Check for duplicates
        $urls = [regex]::Matches($response.Content, "<loc>(.*?)</loc>") | ForEach-Object { $_.Groups[1].Value }
        $duplicates = $urls | Group-Object | Where-Object { $_.Count -gt 1 }
        
        if ($duplicates) {
            Write-Host "⚠ Duplicate URLs found:" -ForegroundColor Yellow
            $duplicates | ForEach-Object { Write-Host "  - $($_.Name) ($($_.Count) times)" -ForegroundColor Yellow }
        } else {
            Write-Host "✓ No duplicate URLs" -ForegroundColor Green
        }
    }
} catch {
    Write-Host "✗ Sitemap error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "`n=== Summary ===" -ForegroundColor White
Write-Host "Run this script after deploying changes to verify everything works correctly." -ForegroundColor Gray