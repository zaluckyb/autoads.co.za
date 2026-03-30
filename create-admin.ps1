# Create first admin user in Payload CMS
$createUserUrl = "http://localhost:3000/api/users/register-first-user"
$userData = @{
    email = "admin@example.com"
    password = "admin123"
    name = "Admin User"
    role = "admin"
} | ConvertTo-Json

try {
    Write-Host "Creating first admin user..."
    $response = Invoke-RestMethod -Uri $createUserUrl -Method POST -Body $userData -ContentType "application/json"
    Write-Host "Admin user created successfully!"
    Write-Host "Response: $($response | ConvertTo-Json)"
} catch {
    Write-Host "Error occurred: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $responseBody = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($responseBody)
        $responseText = $reader.ReadToEnd()
        Write-Host "Response Body: $responseText"
    }
}