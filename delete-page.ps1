# PowerShell script to delete the About Us page

# First, try to login and get a token
$loginUrl = "http://localhost:3000/api/users/login"
$loginBody = @{
    email = "demo-author@example.com"
    password = "password"
} | ConvertTo-Json

Write-Host "Attempting to login..."
try {
    $loginResponse = Invoke-RestMethod -Uri $loginUrl -Method POST -Body $loginBody -ContentType "application/json"
    Write-Host "Login successful"
    
    # Extract the token from the response
    $token = $loginResponse.token
    Write-Host "Token obtained: $($token.Substring(0,20))..."
    
    # Now delete the page
    $deleteUrl = "http://localhost:3000/api/pages/85"
    $headers = @{
        "Authorization" = "JWT $token"
        "Content-Type" = "application/json"
    }
    
    Write-Host "Attempting to delete page with ID 85..."
    $deleteResponse = Invoke-RestMethod -Uri $deleteUrl -Method DELETE -Headers $headers
    Write-Host "Page deleted successfully!"
    Write-Host "Response: $($deleteResponse | ConvertTo-Json)"
    
} catch {
    Write-Host "Error occurred: $($_.Exception.Message)"
    Write-Host "Response: $($_.Exception.Response)"
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $responseBody = $reader.ReadToEnd()
        Write-Host "Response Body: $responseBody"
    }
}