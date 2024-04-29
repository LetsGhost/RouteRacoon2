param(
    [Parameter(Mandatory=$true)]
    [string]$path
)

try {


    Set-Location -Path $path
    Write-Output "Changed directory to: $(Get-Location)"
} catch {
    Write-Output "Failed to change directory to: $path"
    Write-Output $_.Exception.Message
}